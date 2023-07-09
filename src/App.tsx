import React, { useState, useRef } from 'react'
import { Popup, Cell } from 'react-vant'
import PageModal, { PageModalInstance } from "./components/PageModal"

function App() {
  const [visible, setVisible] = useState(false)
  const pageModalRef = useRef<PageModalInstance>(null)
  return (
    <>
      <Cell title='展示弹出层' isLink onClick={() => {
        pageModalRef.current?.open()
        setTimeout(() => {
          setVisible(true)
        })
      }} />
      <PageModal ref={pageModalRef}>
        <Popup
          round
          position='bottom'
          visible={visible}
          onClosed={() => {
            pageModalRef.current?.close()
          }}
          onClose={() => {
            setVisible(false)
          }}>

          <div style={{ padding: '30px 50px' }}>内容</div>
        </Popup>
      </PageModal>
    </>
  )
}

export default App;
