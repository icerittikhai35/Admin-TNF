import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'


const User = ({ match }) => {
  const [usersData, setUserinfo] = useState([]);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [target, setTarget] = useState();
  const [experience, setExperience] = useState();
  const [url, setUrl] = useState();
  const history = useHistory()

  useEffect(() => {
    axios.get('http://34.126.141.128/user_detail.php', {
      params: {
        iduser: match.params.id
      }
    })
      .then(res => {

        setUserinfo(res.data.all);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setWeight(res.data.weight);
        setHeight(res.data.height);
        setTarget(res.data.target);
        setExperience(res.data.experience);
        setUrl(res.data.url);
      })
      .catch(err => {
        alert(err)
      })
  }, [])


  function Submit() {
    const article = {
      iduser: match.params.id,
      username: username,
      email: email,
      weight: weight,
      height: height,
      target: target,
      experience: experience,
      url: url
    };
    axios.post('http://34.126.141.128/editprofile_admin.php', article)
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
    setUrl(base64);
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



  const user = usersData.find(user => user.iduser === match.params.id)
  const userDetails = user ? Object.entries(user) :
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            User id: {match.params.id}
          </CCardHeader>
          <CCardBody>
            <form onSubmit={(e) => Submit(e)}>
              <table className="table table-striped table-hover">
                <tbody>
                
                  <tr >
                    <td width="150">
                      ชื่อผู้ใช้
                    </td>
                    <td>
                      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} disabled={true}/>
                    </td>
                  </tr>
                  <tr >
                    <td width="150">
                      อีเมล์
                    </td>
                    <td>
                      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      เป้าหมาย
                    </td>
                    <td>
                      <select value={target} onChange={(e) => setTarget(e.target.value)}>
                        <option value="1">ลดไขมัน</option>
                        <option value="2">เพิ่มกล้ามเนื้อ</option>
                        <option value="3">เพื่อสุขภาพ</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      ประสบการณ์
                    </td>
                    <td>
                      <select value={experience} onChange={(e) => setExperience(e.target.value)}>
                        <option value="1">มือใหม่</option>
                        <option value="2">ปานกลาง</option>
                        <option value="3">ขั้นสูง</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      รูปโปรไฟล์
                    </td>
                    <td>
                      <img src={url} width="300" />
                      <input type="file"  onChange={(e) => uploadImage(e)} />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" align="center" >
                      <CButton size="lg" color="danger" style={{ margin: 10 }} onClick={() => history.push(`/users`)}> ยกเลิก </CButton>
                      <CButton size="lg" color="success" style={{ margin: 10 }} onClick={(e) => Submit(e)}> ยืนยัน </CButton>
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

export default User