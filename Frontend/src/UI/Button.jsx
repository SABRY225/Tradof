import React from 'react'

export default function Button({action, style, text}) {
    const combinedStyle = Object.values(style).join(' ');
    return (
        <>
            <button type="button" className={combinedStyle} onClick={action}>{text}</button>
        </>
    )
}
