import { DataTable } from "@/core/components/dashboard/data-table"
import Loader from "@/core/components/loading-snipper"
import type { User } from "@/core/types/user"
import { listUsers } from "@/modules/users/services"
import React from "react"

const DashboardPage = () => {

  /*
    * Página principal del dashboard.
  */

  const [users, setUsers] = React.useState<User[]>([])
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listUsers()
        setUsers(response.data)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("Error desconocido")
        }
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])

  if (isLoading) return <Loader /> // Componente de carga
  if (error) return <h1>Error: {error}</h1> 

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <DataTable data={users} />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
