import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import axios from '../../../helpers/Axios';

export default function useRoomStatus(friendlyId, joinInterval) {
  const { t } = useTranslation();

  return useMutation(
    (data) => axios.post(`/meetings/${friendlyId}/status.json`, data).then((resp) => resp.data.data),
    {
      onSuccess: ({ joinUrl }) => {
        if (joinUrl) {
          clearInterval(joinInterval);
          toast.loading(t('toast.success.room.joining_meeting'));
          window.location.replace(joinUrl);
        }
      },
      onError: () => {
        clearInterval(joinInterval);
        toast.error(t('toast.error.users.old_password'));
      },
    },
  );
}