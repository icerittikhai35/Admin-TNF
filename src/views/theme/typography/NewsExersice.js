import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'


const NewsExersice = ({ match }) => {
  const [newsExer, setNewsinfo] = useState([]);
  const [topic, setTopic] = useState();
  const [material, setMaterial] = useState();
  const [date, setDate] = useState();
  const [url, setUrl] = useState();
  const history = useHistory()

  useEffect(() => {
    axios.get('http://34.126.141.128/newsExer_detail.php', {
      params: {
        idnew_feed_exer: match.params.id
      }
    })
      .then(res => {

        setNewsinfo(res.data.all);
        setTopic(res.data.toptic);
        setMaterial(res.data.material);
        setDate(res.data.date);
        setUrl(res.data.url);
      })
      .catch(err => {
        alert(err)
      })
  }, [])


  function Submit() {
    const article = {
      idnew_feed_exer: match.params.id,
      topic: topic,
      material: material,
      date: date,
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



  const news = newsExer.find(news => news.idnew_feed_exer === match.params.id)
  const userDetails = news ? Object.entries(news) :
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
                      รหัสผู้ใช้งาน
                    </td>
                    <td>
                      <input type="text" value={match.params.id} disabled={true} />
                    </td>
                  </tr>
                  <tr >
                    <td width="150">
                      ชื่อผู้ใช้
                    </td>
                    <td>
                      <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
                    </td>
                  </tr>
                  <tr >
                    <td width="150">
                      เนื้อเรื่อง
                    </td>
                    <td>
                      <input type="text" value={material} onChange={(e) => setMaterial(e.target.value)} />
                    </td>
                  </tr>
                  <tr >
                    <td width="150">
                      Date
                    </td>
                    <td>
                      <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
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

export default NewsExersice