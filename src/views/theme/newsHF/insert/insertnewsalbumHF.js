import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'



export default function Insertnewsalbum({ match }) {
    const [img, setImg] = useState();


    function Submit() {
        const article = {
            img: img,
            id: match.params.id
        };
        axios.post('http://34.126.141.128/insertnewsalbum.php', article)
            .then(res => {
                alert(res.data);
            })
            .catch(err => {
                alert(err);
            })
    }

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setImg(base64);
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
                                    <tr>
                                        <td>
                                           รูปที่
                                        </td>
                                        <td >
                                            <img src={img} width="300"  />
                                            <input type="file"  onChange={(e) => uploadImage(e)} />
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

        </CRow >
    )
}
