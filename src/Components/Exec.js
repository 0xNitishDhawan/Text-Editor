import React from 'react'
import Editor from './SubComponent/Editor'
import ButtonSection from "./SubComponent/ButtonSection"

const Exec = () => {
  return (
    <>
    <ButtonSection/>

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