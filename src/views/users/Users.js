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
  CPagination
} from '@coreui/react'

import usersData from './UsersData'
import axios from 'axios'




const Users = () => {


  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

const [info, setInfo] = useState([]);
useEffect(() => {
  const alldatanewsFood = async () => {
    try {
      const response = await axios.get('http://34.126.141.128/All_user.php')
      setInfo(response.data)
    } catch(error) {
      alert(error)
    }
  }
  alldatanewsFood();
}, info);
console.log(info);


  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Users
            <small className="text-muted"> All</small>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={info}
              fields={[
                { key: 'iduser', _classes: 'font-weight-bold' },
                'username', 'password','email',
              ]}
              hover
              striped
              itemsPerPage={5}
     
              clickableRows
              onRowClick={(item) => history.push(`/users/${item.iduser}`)}

            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={5}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users
