import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const AppPreset = definePreset(Aura, {
  components: {
    tag: {
      root: {
        padding: '0.375rem 0.875rem',
      },
    },
    radiobutton: {
      root: {
        checkedBackground: '#007F3D',
        checkedBorderColor: '#007F3D',
        checkedHoverBorderColor: '#007F3D',
        checkedFocusBorderColor: '#007F3D',
      },
    },
    checkbox: {
      root: {
        checkedBackground: '#28B768',
        checkedBorderColor: '#28B768',
        checkedFocusBorderColor: '#28B768',
        checkedHoverBackground: '#007F3D',
        checkedHoverBorderColor: '#007F3D',
      },
    },
    progressspinner: {
      colorScheme: {
        light: {
          root: {
            colorOne: '#28B768',
            colorTwo: '#28B768',
            colorThree: '#28B768',
            colorFour: '#28B768',
          },
        },
      },
    },
    button: {
      colorScheme: {
        light: {
          root: {
            primary: {
              background: '#007F3D',
              hoverBackground: '#28B768',
              borderColor: '#007F3D',
              hoverBorderColor: '#28B768',
            },
          },
          outlined: {
            primary: {
              borderColor: '#007F3D',
              color: '#007F3D',
            },
          },
        },
      },
    },
  },
});
