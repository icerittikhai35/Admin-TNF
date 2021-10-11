import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import usersData from './UsersData'

const User = ({ match }) => {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const alldatanewsFood = async () => {
      try {
        const response = await axios.get('http://34.126.141.128/All_user.php')
        setInfo(response.data)
      } catch (error) {
        alert(error)
      }
    }
    alldatanewsFood();
  }, info);
  const user = info.find(user => user.iduser === match.params.id)
  const userDetails = user ? Object.entries(user) :
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            User id: {match.params.id}
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {
                  userDetails.map(([key, value], index) => {
                    return (
                      <tr key={index}>
                        <td>{`${key}:`}</td>
                        <td><strong>{value}</strong></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
