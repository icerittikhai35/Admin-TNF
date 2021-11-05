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
      .then(response => {

        setNewsinfo(response.data.all);
        setTopic(response.data.Topic_new_feed_exer);
        setMaterial(response.data.Material_new_feed_exer);
        setDate(response.data.Date);
        setUrl(response.data.url);
      })
      .catch(err => {
        alert(err)
      })
  }, [])


  function Submit() {
    const article = {
      idnew_feed_exer: match.params.id,
      Topic_new_feed_exer: topic,
      Material_new_feed_exer: material,
      Date: date,
      url: url,
    };
    axios.post('http://34.126.141.128/editNews_exer.php', article)
      .then(response => {
        alert(response.data);
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


  console.log(topic);


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
                      หัวข้อ
                    </td>
                    <td>
                      <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
                    </td>
                  </tr>
                  <tr >
                    <td width="200">
                      เนื้อเรื่อง
                    </td>
                    <td>
                      <textarea
                        type="textarea"
                        style={{ width: '100%', height: 300 }}
                        value={material} onChange={(e) => setMaterial(e.target.value)}
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
                      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </td>
                  </tr>


                  <tr>
                    <td>
                      รูปโปรไฟล์
                    </td>
                    <td >
                      <img src={url} width="300" />
                      <input type="file" onChange={(e) => uploadImage(e)} />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" align="center" >
                      <CButton size="lg" color="danger" style={{ margin: 10 }} onClick={() => history.push(`/theme/typography`)}> ยกเลิก </CButton>
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