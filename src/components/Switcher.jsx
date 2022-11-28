import Switch from 'react-switch'
import ThemeContext from '../contexts/ThemeContext'
import { useContext } from 'react'
export const Switcher = ()=>{
    const context = useContext(ThemeContext)
    
    const name = context.settings.themeValue.name
    const checked = context.settings.checked

    return <label  type="checkbox" class="toggle toggle-info" checked>
    <span>{name}</span>
    <Switch onChange={context.actions.changeSwitcher} checked={checked} />
  </label>
}

