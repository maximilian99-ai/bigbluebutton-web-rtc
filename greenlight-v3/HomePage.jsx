import React, { useEffect } from 'react';
import {
  Col, Row,
} from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRightIcon, Cog8ToothIcon, ComputerDesktopIcon, VideoCameraIcon, WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/auth/AuthProvider';
import HomepageFeatureCard from './HomepageFeatureCard';
import useRoomConfigValue from '../../hooks/queries/rooms/useRoomConfigValue';

export default function HomePage() {
  const { t } = useTranslation();
  const currentUser = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const error = searchParams.get('error');
  const { data: recordValue } = useRoomConfigValue('record');

  // Redirects the user to the proper page based on signed in status and CreateRoom permission
  useEffect(
    () => {
      // Todo: Use PermissionChecker.
      if (!currentUser.stateChanging && currentUser.signed_in && currentUser.permissions.CreateRoom === 'true') {
        navigate('/rooms');
      } else if (!currentUser.stateChanging && currentUser.signed_in && currentUser.permissions.CreateRoom === 'false') {
        navigate('/home');
      }
    },
    [currentUser.signed_in],
  );

  useEffect(() => {
    switch (error) {
      case 'InviteInvalid':
        toast.error(t('toast.error.users.invalid_invite'));
        break;
      case 'SignupError':
        toast.error(t('toast.error.users.signup_error'));
        break;
      default:
    }
    if (error) { setSearchParams(searchParams.delete('error')); }
  }, [error]);

  return (
    <>
      <Row className="wide-white">
        <Col lg={10}>
          <div id="homepage-hero">
            <h1 className="my-4"> 원격 유지 지원을 위한 Remote Manager</h1>
            <p className="text-muted fs-5">
              원거리 작업장에 있는 장비 및 설비에 대한 실시간 원격유지보수 지원을 통해 제조생산, 공정운영, 유지보수 업무를 혁신적으로 개선합니다.
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <h5 className="text-muted text-uppercase my-4 py-1">
        중요 기능<br />
        1. 실시간 화상 & 보이스 통신<br />
        2. 다자간 화상회의 접속<br />
        3. 실시간 화면캡쳐<br />
        4. 캡쳐화면 필기 및 전송<br />
        5. 스마트폰 듀얼(앞면/뒷면) 카메라 화면 동시 전송<br />
        6. PC 화면 공유<br />
        7. pdf 문서 공유<br />
        8. 녹화 기능<br />
        9. 다양한 스마트기기 운용가능<br />
        10. 독립형 서버로 보안성 확보
        </h5>
      </Row>
    </>
  );
}