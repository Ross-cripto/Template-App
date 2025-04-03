import React from "react"
import { DataTable } from "../components/data-table"
import { listTemplates } from "@/modules/templates/service";
import type { Template } from "../types";
import Loader from "@/core/components/loading-snipper";

const TemplatePage = () => {
  const [templates, setTemplates] = React.useState<Template[]>([]);
  const [error, setErrors] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await listTemplates()
          setTemplates(response)
        } catch (err: unknown) {
          if (err instanceof Error) {
            setErrors(err.message)
          } else {
            setErrors("Error desconocido")
          }
        } finally {
          setIsLoading(false)
        }
      }
      fetchData()
    }, [])

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  return (

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <DataTable data={templates} />
          </div>
        </div>
      </div>

  )
}

export default TemplatePage