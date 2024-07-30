import React from 'react';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useSiteSetting from '../../hooks/queries/site_settings/useSiteSetting';

export default function Logo({ size }) {
  const { isLoading, data: brandingImage } = useSiteSetting('BrandingImage');
  const navigate = useNavigate();

  // Logo can be small or regular size
  const sizeClass = size === 'small'
    ? 'small-logo cursor-pointer'
    : 'logo cursor-pointer position-absolute bottom-0 mx-auto start-0 end-0 text-center';
  // Small Logo is used in Header only and does not require a wrapper
  const sizeWrapperClass = !size ? 'logo-wrapper position-relative d-block mx-auto' : undefined;

  if (isLoading) return <div className={sizeWrapperClass} />;

  return (
    <div className={sizeWrapperClass}>
      <Image
	      src="https://velog.velcdn.com/images/dddf/post/5a20d03b-1d8e-4f61-9d85-1e6f5044aca7/image.png"
        className={sizeClass}
        alt="CompanyLogo"
        onClick={() => { navigate('/'); }}
      />
    </div>
  );
}

Logo.propTypes = {
  size: PropTypes.string,
};

Logo.defaultProps = {
  size: '',
};