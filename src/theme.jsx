import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Open Sans, sans-serif', 
    headerVariant: {
        fontSize: '48px',
        fontWeight: 400,
        lineHeight: '65px',
        letterSpacing: '0em',
        textAlign: 'left',
      },

      footerVariant: {
        fontSize: '36px',
        fontWeight: 400,
        lineHeight: '49px',
        letterSpacing: '0em',
        textAlign: 'left',
      },

      applicationVariant1: {
        fontSize: '28px',
        fontWeight: 700,
        lineHeight: '38px',
        letterSpacing: '0em',
        textAlign: 'center',
      },

      applicationVariant2: {
        fontSize: '20px',
        fontWeight: 700,
        lineHeight: '27px',
        letterSpacing: '0em',
        textAlign: 'left',
      },

      errorVariant: {
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '19px',
        letterSpacing: '0em',
        textAlign: 'left',
      },

      labelVariant: {
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: '22px',
        letterSpacing: '0em',
        textAlign: 'left',
      },

      submissionVariant1: {
        fontSize: '48px',
        fontWeight: 700,
        lineHeight: '65px',
        letterSpacing: '0em',
        textAlign: 'center',
        color: 'pallette.primary.main'
      },

      submissionVariant2: {
        fontSize: '20px',
        fontWeight: 700,
        lineHeight: '27px',
        letterSpacing: '0em',
        textAlign: 'left',
      },

  },
  palette: {
    primary: {
      main: '#003C55', 
      button: '#FCD400',
      footer: '#707070',
      submission: '#000000'
    },

    },
});

export default theme;
