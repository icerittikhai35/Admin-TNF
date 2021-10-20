import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CCollapse
} from '@coreui/react'


import axios from 'axios'



const Users = () => {
  const [details, setDetails] = useState([])
  const [userinfo, setUserinfo] = useState([])
  const [submit, setSubmit] = useState(false)
  const [iduser, setUserid] = useState()
  const history = useHistory()


  useEffect(() => {
    axios.get('http://34.126.141.128/All_user.php')
      .then(res => {
        setUserinfo(res.data);
      })
      .catch(err => {
        alert(err)
      })
  }, [userinfo])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://34.126.141.128/delete_user.php', {
          params: {
            iduser: iduser
          }
        })
        alert(res.data);
      } catch (err) {
        alert(err);
      }
    }
    if (submit) fetchData();
  }, [submit])

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }


  const fields = [
    { key: 'iduser', _style: { width: '10%' } },
    { key: 'username', _style: { width: '20%' } },
    { key: 'email', _style: { width: '30%' } },




    {
      key: 'show_details',
      label: 'จัดการข้อมูล',
      _style: { width: '5%' },
      sorter: false,
      filter: false
    }
  ]


  return (
    <CDataTable
      items={userinfo}
      fields={fields}
      columnFilter
      tableFilter
      itemsPerPageSelect
      itemsPerPage={10}
      hover
      pagination
      scopedSlots={{
        'show_details':
          (item, index) => {
            return (
              <td className="py-2" style={{ width: 100 }}>
                <CButton
                  color="warning"
                  style={{
                    color: 'white',
                    width: 100

                  }}
                  onClick={() => { toggleDetails(index) }}
                >
                  {details.includes(index) ? 'ซ่อน' : 'จัดการข้อมูล'}
                </CButton>
              </td>
            )
          },
        'details':
          (item, index) => {
            return (
              <CCollapse show={details.includes(index)}>
               
                  <tr style={{width:'100%',justifyContent:'space-around',flexDirection:'row'}}>
                    <td >
                      {item.url == null || item.url == "" ? (
                        <>
                          <h4>ยังไม่มีรูปภาพ</h4>
                        </>
                      ) : (
                        <>
                          <h4><img src={item.url} height="100" /></h4>
                        </>
                      )}
                    </td>
                    <td>
                      <h4>Id : {item.iduser}</h4>
                    </td>
                    <td>
                      <h4>Username : {item.username}</h4>
                    </td>
                    <td>
                      <h4>Email : {item.email}</h4>
                    </td>
                    <td >
                      <CButton size="sm" color="info" onClick={() => history.push(`/users/${item.iduser}`)}>
                        Edit
                      </CButton>
                      <CButton size="sm" color="danger" className="ml-1" onClick={() => { if (window.confirm('ยืนยันการลบข้อมูล')) setSubmit(true); setUserid(item.iduser) }}>
                        Delete
                      </CButton>
                    </td>
                  </tr>


                
              </CCollapse>
            )
          }
      }}
    />
  )
}

export default Users