import Switch from 'react-switch'
import ThemeContext from '../contexts/ThemeContext'
import { useContext } from 'react'
export const Switcher = ()=>{
    const context = useContext(ThemeContext)
    console.log('c in switcher',context)
    const checked = context.settings.checked

    return <label>
    <Switch onChange={context.actions.changeSwitcher} checked={checked} />
  </label>
}