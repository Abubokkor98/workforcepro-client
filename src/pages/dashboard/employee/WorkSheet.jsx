import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import { FiEdit, FiTrash } from "react-icons/fi";
import useAuth from "../../../customHooks/useAuth";
import useAxiosPublic from "../../../customHooks/useAxiosPublic";
import useTasks from "../../../customHooks/useTasks";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import toast from "react-hot-toast";

export default function WorkSheet() {
  const { register, handleSubmit, control, reset } = useForm();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [tasks, loading, refetch] = useTasks();

  const onSubmit = async (data) => {
    const newTask = {
      employee_name: user.displayName,
      employee_email: user.email,
      task: data.task,
      hours: data.work_duration,
      date: data.date,
    };
    console.log(newTask);
    // post task in the db
    const { data: task } = await axiosPublic.post("/tasks", newTask);
    console.log(task);
    if (task.insertedId) {
      reset();
      refetch();
    }
  };

  const handleDeleteTask =async (task) => {
    console.log('delete btn clicked');
    const { data } =await axiosSecure.delete(`/tasks/${task._id}`);
    console.log(data);
    if (data.deletedCount > 0) {
      toast.error("task delete successfully");
      refetch();
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Work Sheet</h2>
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-4 mb-6"
      >
        {/* Task Dropdown */}
        <select
          {...register("task", { required: true })}
          defaultValue={""}
          className="border p-2 rounded"
        >
          <option disabled value={""}>
            Select Your Task
          </option>
          <option>Sales</option>
          <option>Support</option>
          <option>Content</option>
          <option>Paper-work</option>
        </select>

        {/* Work Duration Input */}
        <input
          type="number"
          {...register("work_duration", { required: true })}
          placeholder="Hours Worked"
          className="border p-2 rounded"
        />

        {/* Date Picker */}
        <Controller
          name="date"
          control={control}
          defaultValue={new Date()}
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              className="border p-2 rounded"
            />
          )}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>

      {/* Table */}
      <table className="w-full border-collapse border border-primary">
        <thead>
          <tr className="bg-secondary text-white">
            <th className="p-2">Task</th>
            <th className="p-2">Hours</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr
              key={index}
              className="odd:bg-background even:bg-accent/10 text-center"
            >
              <td className="p-2">{task.task}</td>
              <td className="p-2">{task.hours}</td>
              <td className="p-2">{new Date(task.date).toDateString()}</td>
              <td className="p-2">
                <button
                  className="text-primary hover:text-secondary"
                  onClick={() => console.log("Edit task", index)}
                >
                  <FiEdit size={20} />
                </button>

                <button
                  onClick={() => handleDeleteTask(task)}
                  className="text-secondary hover:text-accent"
                >
                  <FiTrash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
