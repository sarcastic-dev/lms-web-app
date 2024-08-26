import React from 'react'
import { toast } from './ui/use-toast'

const LmsToast = () => {
  return (
    <div>{
      toast({
				title: "",
				description: (
					<div
						style={{
							display: "flex",
							alignItems: "center",
						}}
					>
						<CheckCircleIcon
							size={24}
							style={{ marginRight: "18px" }}
							className='text-lmsSuccess'
						/>
						<div>
							<strong>Success</strong>
							<p>{response.data.message}</p>
						</div>
					</div>
				),
				style: {
					backgroundColor: "#baf8c6",
					color: "#092F5C",
					padding: "12px 16px",
					borderRadius: "8px",
					borderLeft: "4px solid #24A148",
					boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
					// maxWidth: "350px",
				},

				duration: 3000, // Auto-hide after 3 seconds
			});}</div>
  )
}

export default LmsToast