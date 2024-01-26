import { defaultTheme } from '@aws-amplify/ui-react';
const ourTheme = {
    name: 'my-theme',
    overrides: 
    [{
        colorMode: 'dark',
        tokens: {
            colors: {
                background:{
                    secondary:{value: "#0D1A26"}
                },
                neutral: {
                  10: { value: defaultTheme.tokens.colors.neutral[100].value },
                  20: { value: defaultTheme.tokens.colors.neutral[90].value },
                  40: { value: defaultTheme.tokens.colors.neutral[80].value },
                  80: { value: defaultTheme.tokens.colors.neutral[40].value },
                  90: { value: defaultTheme.tokens.colors.neutral[20].value },
                  100: { value: defaultTheme.tokens.colors.neutral[10].value },
                },
                white: { value: '#000' }, // set white to black,and black to white (inverse)
                black: {value: '#fff'}
            },
            components:{
                button:{
                    primary:{
                        backgroundColor: {value: "{colors.purple.60}"},
                        hover: {
                            backgroundColor: {value: "{colors.purple.80}"},
                            color: {value: "{colors.black}"}
                        },
                        color: {value: "{colors.black}"}
                    }
                },
                table: {
                    row: {
                        hover: {
                            backgroundColor: { value: '{colors.overlay.40}' },
                        },
                        striped: {
                            backgroundColor: { value: '{colors.neutral.10}' },
                        },
                    },
                    header: {
                        color: { value: '{colors.purple.60}' },
                        fontSize: { value: '{fontSizes.medium}' },
                        fontWeight: {value: '{fontWeights.medium}'},
                    },
                    data: {
                        fontWeight: { value: '{fontWeights.light}' },
                    },
                },
            }
            
        },
    },
    // light mode tokens:
    {colorMode: 'light',
        tokens:{
            components: {
                table: {
                    row: {
                        hover: {
                            backgroundColor: { value: '{colors.teal.20}' },
                        },
                        striped: {
                            backgroundColor: { value: '{colors.teal.10}' },
                        },
                    },
                    header: {
                        color: { value: '{colors.teal.80}' },
                        fontSize: { value: '{fontSizes.medium}' },
                        fontWeight: {value: '{fontWeights.medium}'},
                    },
                    data: {
                        fontWeight: { value: '{fontWeights.light}' },
                    },
                },
            },
        }
    }
],}
export default ourTheme;