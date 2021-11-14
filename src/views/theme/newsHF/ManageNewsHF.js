import React, { useState, useEffect, Component } from 'react'
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
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios';



export default function ManageNewsHF({ navigation, route }) {
  const [details, setDetails] = useState([])
  const [userinfo, setUserinfo] = useState([])
  const [submit, setSubmit] = useState(false)
  const [idnew_feed_health_food, setNewsid] = useState()
  const history = useHistory()


  useEffect(() => {
    axios.get('http://34.126.141.128/All_newsHF.php')
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
        const res = await axios.get('http://34.126.141.128/delete_newsHF.php', {
          params: {
            idnew_feed_health_food: idnew_feed_health_food
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
    { key: 'idnew_feed_health_food', _style: { width: '10%' } },
    { key: 'Topic_new_feed_health_food', _style: { width: '20%' } },





    {
      key: 'show_details',
      label: 'จัดการข้อมูล',
      _style: { width: '0%' },
      sorter: false,
      filter: false
    }
  ]

  return (
    <>
      <tr style={{ width: 2000, alignItems: 'center', }}>
        <td style={{ width: 2000, alignItems: 'center',paddingLeft:'88%' }}>
          <CButton
            color="success"
            style={{
              color: 'white',
              width: 200,
              height: 50,
              fontWeight: 'bold'
            }}
           onClick={() => history.push(`/theme/newsHF/insert`)}
          >
            เพิ่มข่าวสารสุขภาพ
          </CButton>
        </td>
      </tr>
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

                  <tr style={{ width: '100%', justifyContent: 'space-around', flexDirection: 'row' }}>
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
                      <h4>ชื่อเรื่อง : {item.Topic_new_feed_health_food}</h4>
                    </td>

                    <td >
                      <CButton size="sm" color="info" onClick={() => history.push(`/theme/newsHF/${item.idnew_feed_health_food}`)}>
                        Edit
                      </CButton>
                      <CButton size="sm" color="danger" className="ml-1" onClick={() => { if (window.confirm('ยืนยันการลบข้อมูล')) setSubmit(true); setNewsid(item.idnew_feed_health_food) }}>
                        Delete
                      </CButton>
                    </td>
                  </tr>


 
                </CCollapse>
              )
            }
        }}
      />
    </>


  );
}



