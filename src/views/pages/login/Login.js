import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import { useHistory, useLocation } from 'react-router-dom'




const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();


  
  function Submit() {
    axios.get('http://34.126.141.128/login_Admin.php', {
      params: {
        username: username,
        password: password,
      }
    })
      .then(res => {
        if (res.data.onLogin == 'true') {
          reactLocalStorage.set('idadmin', res.data.idadmin)
          history.push('/users') 
        } else {
          alert(res.data);
        }

      })
      .catch(err => {
        alert(err);
      })
  }


  
  return (
    <div className="c-app c-default-layout flex-row align-items-center" style={{ backgroundImage: 'url("img/3114610.jpg")' }}>
      <CContainer >
        <CRow className="justify-content-center">
          <CCol md="5">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to Admin account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="success" className="px-4" onClick={Submit}>Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard >

            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
