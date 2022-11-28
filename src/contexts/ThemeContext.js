import { createContext ,useState} from "react";

export const THEMES = {
    dark:{
        
        background:'bg-slate-800'
    },
    light:{
       
        background:'bg-gradient-to-b from-sky-300'
    }
}

let ThemeContext = createContext({
    theme:THEMES.light
})
// export const ThemeProvider = ThemeContext.Provider;
export const ThemeProvider = ({theme,children})=>{
    const [themeValue, setThemeValue] = useState(theme);
    const [checked, setChecked] = useState(theme.name==='light'?true:false)
    const changeSwitcher = (v)=>{
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