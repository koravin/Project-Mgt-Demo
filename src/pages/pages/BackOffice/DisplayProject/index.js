import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { Grid, Typography } from '@mui/material'

function DisplayProject() {
  const router = useRouter() // router สร้าง path
  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  // รับค่าข้อมูลโปรเจค
  const [projectdata, setProjectData] = useState([])

  const columns = [
    { field: 'project_code', headerName: 'ID', width: 120 },
    { field: 'project_name_th', headerName: 'ชื่อโครงงาน(ภาษาไทย)', width: 300 },
    {
      field: 'Detail',
      headerName: 'Detail',
      width: 100,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleDetailClick(cellValues.row.preproject_id)}>
            ...
          </Button>
        )
      }
    },
    {
      field: 'Delete',
      headerName: 'Delete',
      width: 100,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleDeleteSubmit(cellValues.row.project_id)}>
            ...
          </Button>
        )
      }
    }
  ]

  // รับค่าข้อมูลจาก Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/getallprojects`)
        console.log(response.data.data)
        setProjectData(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  // ส่งค่าจากแถวไปหน้า Detail
  const handleDetailClick = projectId => {
    router.push(`/pages/BackOffice/DisplayProject/ProjectDetail/?id=${projectId}`)
  }

  // ฟังก์ชันสำหรับ Delete DATA
  const handleDeleteSubmit = projectId => {
    Swal.fire({
      title: 'แกทำร้ายเพื่อฉันแกไม่รอดแน่ ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่'
    })

    //   Swal.fire({
    //     title: 'คุณต้องการลบข้อมูลหรือไม่?',
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonText: 'ใช่',
    //     cancelButtonText: 'ไม่'
    //   }).then(result => {
    //     if (result.isConfirmed) {
    //       const data = {
    //         preproject_id: projectId
    //       }

    //       if (projectId !== '') {
    //         axios
    //           .put(`${process.env.NEXT_PUBLIC_API}api/project-mgt/deletepreproject`, data)
    //           .then(function (response) {
    //             console.log(response)

    //             Swal.fire({
    //               icon: 'success',
    //               title: 'ลบข้อมูลแล้วเสร็จ',
    //               text: 'คุณไม่สามารถกู้คืนข้อมูลได้แล้ว'
    //             })

    //             setProjectData(prevData => prevData.filter(project => project.preproject_id !== projectId))
    //           })
    //           .catch(function (error) {
    //             console.log(error)

    //             Swal.fire({
    //               icon: 'error',
    //               title: 'เกิดข้อผิดพลาด',
    //               text: 'ไม่สามารถลบข้อมูลได้'
    //             })
    //           })
    //       } else {
    //         console.log('not have any id to delete')
    //       }
    //     } else if (result.isDenied) {
    //       console.log('cancelled delete')
    //     }
    //   })
  }

  return (
    <div>
      <Grid>
        <Typography variant='h6' align='center' sx={{ mb: 10, fontWeight: 'bold' }}>
          ตารางแสดงรายชื่อหัวข้อโครงงาน - วิชาโปรเจค
        </Typography>

        <Box sx={{ height: '100%', width: '100%' }}>
          {projectdata === null || typeof projectdata === 'undefined' ? (
            <p>No Data</p>
          ) : projectdata.length === 0 ? (
            <p>No Data</p>
          ) : (
            <DataGrid
              rows={projectdata}
              columns={columns}
              getRowId={row => row.preproject_id}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10
                  }
                }
              }}
              pageSizeOptions={[5, 10, 20]}
              disableRowSelectionOnClick
            />
          )}
        </Box>
      </Grid>
    </div>
  )
}

export default DisplayProject
