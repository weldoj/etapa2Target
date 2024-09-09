import { api } from "~/trpc/server"
import { Task, columns } from "./columns"
import { DataTable } from "./data-table"
import ModalCreate from "../_components/modelCreate"
 
async function getData(): Promise<Task[]> {
  // Fetch data from your API here.
  const datas = await api.task.getAll()
  return datas

}

export default async function Tarefas(){
    const data = await getData()
 
    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />

      </div>
    )
}


