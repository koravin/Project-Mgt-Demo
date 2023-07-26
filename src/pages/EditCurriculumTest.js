import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

// MUI Import
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Autocomplete from '@mui/material/Autocomplete'

const EditCurriculumTest = () => {
  const projectId = 205

  // เก็บตัวแปร Edit
  const [Editdata, setEditdata] = useState([])

  // ตัวแปร เก็บ ค่า เพื่อส่งไปในฟอร์ม
  const [curriculumsId, setCurriculumsId] = useState('') // เก็บข้อมูลหลักสูตร

  // รับค่าข้อมูลจาก Api
  const [curriculumsData, setCurriculumsData] = useState([]) // รับข้อมูลหลักสูตร

  // ดึงข้อมูล Api มา Set form Edit
  useEffect(() => {
    const fetchEditData = async () => {
      try {
        const response = await axios.get(`http://localhost:3200/api/project-mgt/preproject?preproject_id=${projectId}`)
        setEditdata(response.data)

        //console.log(response.data)

        //console.log(Editdata.PreprojectCommittee)

        // console.log(Editdata.PreprojectData)

        // console.log(Editdata.PreprojectStudent)

        // console.log(Editdata.PreprojectSubAdviser)
      } catch (error) {
        console.error(error)
      }
    }

    fetchEditData()
  }, [projectId, Editdata])

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของค่าใน Select dropdown
  const handleCurriculumsChange = event => {
    setCurriculumsId(event.target.value)
    setSubjectId('')
    setYearId('')
  } // จัดการการเปลี่ยนแปลงค่าของหลักสูตร

  // ดึงข้อมูลหลักสูตรจาก Api curriculums
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3200/api/project-mgt/curriculums')
        setCurriculumsData(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <div>555</div>
      {/* Curriculum Select */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id='curriculum-label'>Curriculum</InputLabel>
          <Select
            label='Curriculum'
            value={curriculumsId}
            onChange={handleCurriculumsChange}
            labelId='curriculum-label'
          >
            {curriculumsData.map(curriculum => (
              <MenuItem key={curriculum.curriculum_id} value={curriculum.curriculum_id}>
                {curriculum.curriculum_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </div>
  )
}

export default EditCurriculumTest
