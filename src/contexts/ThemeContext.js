import { createContext ,useState} from "react";

export const THEMES = {
    dark:{
        name:'dark',
        background:'bg-zinc-900'
    },
    light:{
        name:'light',
        background:'bg-sky-300'
    }
}

let ThemeContext = createContext({
    theme:THEMES.light
})
// export const ThemeProvider = ThemeContext.Provider;
export const ThemeProvider = ({theme,children})=>{
    console.log('default passed theme', theme)
    const [themeValue, setThemeValue] = useState(theme);
    const [checked, setChecked] = useState(theme.name==='light'?true:false)
    console.log('state theme',themeValue)
    const changeSwitcher = (v)=>{
        console.log('new  checked value is:',checked)
        let newChecked = !checked
        setChecked(newChecked)
        setThemeValue(newChecked?THEMES.light:THEMES.dark)
    }
    return <ThemeContext.Provider value={{
        settings:{
            themeValue,
            checked
        },
        actions:{
            changeSwitcher
        }
    }}>
        {children}
    </ThemeContext.Provider>
}
export default ThemeContext;