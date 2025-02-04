import * as React from 'react';

import { useTranslation } from 'react-i18next';
import { isNil, not } from 'ramda';

import {
  Paper,
  Theme,
  Typography,
  LinearProgress,
  Container,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { labelDefinePasswordSecurityPolicy } from './translatedLabels';
import useAuthentication from './useAuthentication';
import Form from './Form';
import { SecurityPolicy } from './models';
import LoadingSkeleton from './LoadingSkeleton';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: 'fit-content',
  },
  loading: {
    height: theme.spacing(0.5),
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const Authentication = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    sendingGetSecurityPolicy,
    initialSecurityPolicy,
    loadSecurityPolicy,
  } = useAuthentication();

  const isSecurityPolicyEmpty = React.useMemo(
    () => isNil(initialSecurityPolicy),
    [initialSecurityPolicy],
  );

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h4">
          {t(labelDefinePasswordSecurityPolicy)}
        </Typography>
        <div className={classes.loading}>
          {not(isSecurityPolicyEmpty) && sendingGetSecurityPolicy && (
            <LinearProgress />
          )}
        </div>
        {isSecurityPolicyEmpty ? (
          <LoadingSkeleton />
        ) : (
          <Form
            initialValues={initialSecurityPolicy as SecurityPolicy}
            loadSecurityPolicy={loadSecurityPolicy}
          />
        )}
      </Paper>
    </Container>
  );
};

export default Authentication;
