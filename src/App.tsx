import { useAtom } from 'jotai'
import axios from 'axios'
import { AtomData } from './provider/counter'
import { Button, Input, Modal, Select } from 'antd'
import { useState } from 'react'

const App = () => {
	const api = 'https://68223a6fb342dce8004d921a.mockapi.io/ishoq'
	const [data, setTodos] = useAtom(AtomData)
	let [inpNameAdd, setInpNameAdd] = useState('')
	let [inpNameEdit, setInpNameEdit] = useState('')
	let [statusAdd, setStatusAdd] = useState(null)
	let [idx, setIdx] = useState(null)
	async function deleteUser(id: number) {
		try {
			await axios.delete(`${api}/${id}`)
			setTodos()
		} catch (error) {
			console.error(error)
		}
	}
	async function editStatus(id: number) {
		try {
			let opa = data.find(e => e.id == id)
			let updateSta = { ...opa, status: !opa.status }
			await axios.put(`${api}/${id}`, updateSta)
			setTodos()
		} catch (error) {
			console.error(error)
		}
	}
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isModalOpen1, setIsModalOpen1] = useState(false)

	const showModal = () => {
		setIsModalOpen(true)
	}
	const showModal1 = e => {
		setInpNameEdit(e.name)
		setIdx(e.id)
		setIsModalOpen1(true)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}
	const handleCancel1 = () => {
		setIsModalOpen1(false)
	}
	async function addUser(e: React.FormEvent) {
		e.preventDefault()
		let obj = {
			name: inpNameAdd,
			status: statusAdd,
		}
		await axios.post(api, obj)
		setIsModalOpen(false)
		setTodos()
	}
	async function edited(e: React.FormEvent) {
		e.preventDefault()
		let obj = {
			name: inpNameEdit,
		}
		await axios.put(`${api}/${idx}`, obj)
		setIsModalOpen1(false)

		setTodos()
	}

	return (
		<>
			<Button type='primary' onClick={showModal} className='ml-[17%] mt-[20px]'>
				Add User
			</Button>
			<Modal
				title='Basic Modal'
				closable={{ 'aria-label': 'Custom Close Button' }}
				open={isModalOpen}
				footer={null}
				onCancel={handleCancel}
			>
				<form action='' className='flex flex-col gap-[10px]' onSubmit={addUser}>
					<Input
						placeholder='Basic usage'
						value={inpNameAdd}
						onChange={e => {
							setInpNameAdd(e.target.value)
						}}
					/>
					<Select
						style={{ width: '100%' }}
						allowClear
						options={[
							{ value: true, label: 'Active' },
							{ value: false, label: 'Inactive' },
						]}
						placeholder='status'
						onChange={value => setStatusAdd(value)}
					/>
					<Button type='primary' htmlType='submit' style={{ width: '100%' }}>
						Add user
					</Button>
				</form>
			</Modal>
			<Modal
				title='Basic Modal'
				closable={{ 'aria-label': 'Custom Close Button' }}
				open={isModalOpen1}
				footer={null}
				onCancel={handleCancel1}
			>
				<form action='' className='flex flex-col gap-[10px]' onSubmit={edited}>
					<Input
						placeholder='Name...'
						value={inpNameEdit}
						onChange={e => {
							setInpNameEdit(e.target.value)
						}}
					/>
					<Button type='primary' htmlType='submit' style={{ width: '100%' }}>
						Edit user
					</Button>
				</form>
			</Modal>
			<div className='flex w-[70%] justify-between flex-wrap items-center m-auto'>
				{data.map(e => {
					return (
						<div
							className='w-[430px] h-[330px] bg-[steelblue] rounded-[60px] flex flex-col justify-center items-center text-white text-[33px] font-black mt-[20px]'
							key={e.id}
						>
							<p>{e.name}</p>
							<p>{e.status ? 'Active' : 'Inactive'}</p>
							<div className='flex justify-center gap-[3px] items-center'>
								<Button
									color='danger'
									variant='filled'
									onClick={() => {
										deleteUser(e.id)
									}}
								>
									delete
								</Button>
								<Button
									color='primary'
									variant='filled'
									onClick={() => {
										editStatus(e.id)
									}}
								>
									Status
								</Button>
								<Button
									color='cyan'
									variant='filled'
									onClick={() => {
										showModal1(e)
									}}
								>
									Edit
								</Button>
							</div>
						</div>
					)
				})}
			</div>
		</>
	)
}

export default App
