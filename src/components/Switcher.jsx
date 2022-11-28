import React, { useContext }  from 'react';
import Switch from 'react-switch'
import ThemeContext from '../contexts/ThemeContext'
export const Switcher = ()=>{
    const context = useContext(ThemeContext)
    console.log('c in switcher',context)
    const name = context.settings.themeValue.name
    const checked = context.settings.checked

    return <label>
    <span>{name}</span>
    <Switch onChange={context.actions.changeSwitcher} checked={checked} />
  </label>
}