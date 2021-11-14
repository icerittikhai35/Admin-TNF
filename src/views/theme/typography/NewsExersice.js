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
  const [album, setAlbum] = useState([]);
  const history = useHistory();
  const [submit, setSubmit] = useState(false)
  const [idalbum_exer, setNewsid] = useState()

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

  useEffect(() => {
    axios.get('http://34.126.141.128/showalbumexer.php', {
      params: {
        id: match.params.id
      }
    })
      .then(response => {
        setAlbum(response.data);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://34.126.141.128/delete_img_exer.php', {
          params: {
            idalbum_exer: idalbum_exer
          }
        })
        alert(res.data);
      } catch (err) {
        alert(err);
      }
    }
    if (submit) fetchData();
  }, [submit])



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
                      หัวข้อ
                    </td>
                    <td>
                      <input type="text" style={{ width: '100%', }} value={topic} onChange={(e) => setTopic(e.target.value)} />
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

      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            อัลบั้มรูป <CButton size="lg" color="info" style={{ margin: 10 }} onClick={() => history.push(`/theme/typography/${match.params.id}/insertalbum`)}> เพิ่มรูป </CButton>
          </CCardHeader>
          <CCardBody>
            <form onSubmit={(e) => Submit(e)}>
              <table className="table table-striped table-hover">
                <tbody>
                  <tr>
                    <td>รูปที่ 1</td>
                    <td>ภาพ</td>
                    <td></td>
                    <td></td>
                  </tr>
                  {album == null ? (
                    <>
                      <td>ไม่มีข้อมูล</td>
                    </>
                  ) : (
                    <>
                      {album.map((item, index) => (
                        <tr>
                          <td>{index + 1} </td>
                          <td>
                            <img src={item.album_exer_img} width={400} />
                          </td>
                          <td></td>
                          <td>
                            <CButton size="lg" color="danger" style={{ margin: 10 }} onClick={() => { if (window.confirm('ยืนยันการลบข้อมูล')) setSubmit(true); setNewsid(item.idalbum_exer) }}> ลบ </CButton>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}

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