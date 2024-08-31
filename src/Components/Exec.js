import React from 'react'
import Editor from './Editor'
import Homebutton from './Homebutton'

const Exec = () => {
  return (
    <>
    <Homebutton/>
    <Editor editorHeading={"Exec Summary"}/>
    <hr/>
    <Editor editorHeading={"Passengers"}/>
    <hr/>
    <Editor editorHeading={"Capacity"}/>
    <hr/>
    <Editor editorHeading={"People"}/>
    <hr/>
    <Editor editorHeading={"Revenue"}/>
    <hr/>
    <Editor editorHeading={"Opex"}/>
    </>
  )
}

export default Exec