import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'



export default function InsertNewsHF() {
  const [header, setHeader] = useState();
  const [descrip, setDescrip] = useState();
  const [date, setDate] = useState();
  const [profile, setProfile] = useState();

  function Submit() {
    const articleHF = {
      header: header,
      descrip: descrip,
      date: date,
      profile: profile,
    };
    axios.post('http://34.126.141.128/insertnewsHF.php', articleHF)
      .then(res => {
        alert(res.data);
      })
      .catch(err => {
        alert(err);
      })
  }
  const uploadImageHF = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setProfile(base64);
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>

          </CCardHeader>
          <CCardBody>
            <form >
              <table className="table table-striped table-hover">
                <tbody>
                  <tr >
                    <td width="150">
                      หัวข้อ
                    </td>
                    <td>
                      <input type="text" onChange={(e) => setHeader(e.target.value)} />
                    </td>
                  </tr>
                  <tr >
                    <td width="200">
                      เนื้อหาข่าว
                    </td>
                    <td>
                      <textarea
                        type="textarea"
                        style={{ width: '100%', height: 300 }}
                        onChange={(e) => setDescrip(e.target.value)}
                        rows={5}
                        cols={5}
                      />
                    </td>
                  </tr>
                  <tr >
                    <td width="150">
                      Date
                    </td>
                    <td>
                      <input type="date" onChange={(e) => setDate(e.target.value)} />
                    </td>
                  </tr>


                  <tr>
                    <td>
                      รูปโปรไฟล์
                    </td>
                    <td >
                      <img src={profile} width="300" />
                      <input type="file" onChange={(e) => uploadImageHF(e.target.value)} />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" align="center" >
                      <CButton size="lg" color="danger" style={{ margin: 10 }}> ยกเลิก </CButton>
                      <CButton size="lg" color="success" onClick={Submit} > ยืนยัน </CButton>
                    </td>
                  </tr>
                </tbody>

              </table>
            </form>
          </CCardBody>
        </CCard>
      </CCol>

    </CRow>
  )
}
