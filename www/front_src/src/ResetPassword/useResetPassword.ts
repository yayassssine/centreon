import { FormikHelpers, FormikValues } from 'formik';
import { equals, not } from 'ramda';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useAtomValue } from 'jotai/utils';
import { useNavigate } from 'react-router';

import { putData, useRequest, useSnackbar } from '@centreon/ui';

import { ResetPasswordValues } from './models';
import {
  labelNewPasswordsMustMatch,
  labelPasswordChanged,
  labelRequired,
  labelTheNewPasswordIstheSameAsTheOldPassword,
} from './translatedLabels';
import { resetPasswordEndpoint } from './api/endpoint';
import { passwordResetInformationsAtom } from './passwordResetInformationsAtom';

interface UseResetPasswordState {
  submitResetPassword: (
    values: ResetPasswordValues,
    { setSubmitting }: Pick<FormikHelpers<FormikValues>, 'setSubmitting'>,
  ) => void;
  validationSchema: Yup.SchemaOf<ResetPasswordValues>;
}

function matchNewPasswords(this, newConfirmationPassword?: string): boolean {
  return equals(newConfirmationPassword, this.parent.newPassword);
}

function differentPasswords(this, newPassword?: string): boolean {
  return not(equals(newPassword, this.parent.oldPassword));
}

const useResetPassword = (): UseResetPasswordState => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { showSuccessMessage } = useSnackbar();
  const { sendRequest } = useRequest({
    request: putData,
  });

  const passwordResetInformations = useAtomValue(passwordResetInformationsAtom);

  const submitResetPassword = (
    values: ResetPasswordValues,
    { setSubmitting }: Pick<FormikHelpers<FormikValues>, 'setSubmitting'>,
  ): void => {
    sendRequest({
      data: {
        new_password: values.newPassword,
        old_password: values.oldPassword,
      },
      endpoint: resetPasswordEndpoint(
        passwordResetInformations?.alias as string,
      ),
    })
      .then(() => {
        showSuccessMessage(t(labelPasswordChanged));
        navigate(passwordResetInformations?.redirectUri as string);
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .test(
        'match',
        t(labelTheNewPasswordIstheSameAsTheOldPassword),
        differentPasswords,
      )
      .required(t(labelRequired)),
    newPasswordConfirmation: Yup.string()
      .test('match', t(labelNewPasswordsMustMatch), matchNewPasswords)
      .required(t(labelRequired)),
    oldPassword: Yup.string().required(t(labelRequired)),
  });

  return {
    submitResetPassword,
    validationSchema,
  };
};

export default useResetPassword;
