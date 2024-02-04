// import { defaultTheme } from '@aws-amplify/ui-react';
const ourTheme = {
    name: 'our-theme',
    tokens: {
        borderWidths: {
            small: { value: '2px' },
            medium: { value: '4px' },
            large: { value: '8px' },
            },
            radii: {
            xs: { value: '1rem' },
            small: { value: '2rem' },
            medium: { value: '2rem' },
            large: { value: '2rem' },
            xl: { value: '3rem' },
        },
    },
    overrides: 
    [{
        colorMode: 'dark',
        tokens: {
            colors: {
                // primary is shades of violet/purple
                primary:{
                    10: { value: "#8a92be"},
                    20: { value: "#5a64a2"},
                    40: { value: "#515a92" },
                    80: { value: "#485081" },
                    90: { value: "#3f4671" },
                    100: { value: "#363c61"},
                },
                //secondary is shades of pink
                secondary:{
                    10: { value: "#e9b6c6" },
                    20: { value: "#dc92aa" },
                    40: { value: "#d57f9d" },
                    80: { value: "#cd6d8f" },
                    90: { value:  "#c55982"},
                    100: { value: "#b22d69"},
                },
                font: {
                    primary: {value: "#faedf0" },  // white-pink
                    secondary:{value: "#424769"},
                    tertiary: {value: "#7077A1"},
                    quaternary: {},
                    interactive: {value: "#e3a4b8"},
                    disabled:{},
                    hover: { value: "#f5dae2"},
                    info:{value: "#7570a1"},
                    warning: {value: "#fda194"},
                    error: {value: "#a17077"},
                    success: {value: "#77a170"}
                },
                background:{
                    primary: {value: "#2d3250" },
                    secondary:{value: "#424769"},
                    tertiary: {value: "#7077A1"},
                    quaternary: {},
                    disabled:{},
                    info:{value: "#7570a1"},
                    warning: {value: "#fda194"},
                    error: {value: "#a17077"},
                    success: {value: "#77a170"}
                },
                border:{
                    primary: {value: "#fff"},
                    secondary: {value: "#dc92aa"},
                    tertiary: {value: "#e3a4b8"},
                    disabled: {value: "#8c757c"},
                    pressed:{value: "#e3a4b8"},
                    focus:{value: "#e3a4b8"},
                    error:{value: "#e72f42"},
                    info:{value: "#faedf0"},
                    success:{value: "#00945a"},
                    warning: {value: "#c8513a"}
                },
                neutral: {
                  10: { value: "#ebebf0" },
                  20: { value: "#d8d8e1" },
                  40: { value: "#7c7d98"},
                  80: { value: "#6a6c8a" },
                  90: { value: "#585b7c" },
                  100: { value: "#474b6e" },
                },
            },
            components: {
                button:{
                    primary:{
                        backgroundColor: {value: "{colors.secondary.20}"},
                        color: {value: "{colors.white}"},
                        hover: {
                            color:{value: "{colors.white}"} ,
                            backgroundColor:{value: "{colors.secondary.40}"} 
                        }
                    },
                //styling for generic button i.e default: (comment out if you want to see)
                //     backgroundColor: {value: "{colors.background.primary}"},
                //     color: {value: "{colors.secondary.20}"},
                //     borderColor: {value: "{colors.secondary.20}"},
                //     hover: {
                //         color:{value: "{colors.secondary.10}"} ,
                //         backgroundColor: {value: "{colors.neutral.10}"},
                //         borderColor:{value: "{colors.secondary.20}"} 
                //     }
                // }
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