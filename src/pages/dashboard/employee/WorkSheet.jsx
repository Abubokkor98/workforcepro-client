import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { useForm, Controller } from "react-hook-form";
import { FiEdit, FiTrash } from "react-icons/fi";
import useAuth from "../../../customHooks/useAuth";
import useTasks from "../../../customHooks/useTasks";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

export default function WorkSheet() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [sortedTasks, loading, refetch] = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // form state
  const mainForm = useForm();
  const { register, handleSubmit, control, reset } = mainForm;
  // modal form state
  const modalForm = useForm();
  const {
    register: modalRegister,
    handleSubmit: modalHandleSubmit,
    control: modalControl,
    setValue,
  } = modalForm;

  // main form handler
  const onSubmit = async (data) => {
    const newTask = {
      employee_name: user.displayName,
      employee_email: user.email,
      task: data.task,
      hours: data.work_duration,
      date: data.date,
    };
    const { data: task } = await axiosSecure.post("/tasks", newTask);
    if (task.insertedId) {
      reset();
      refetch();
    }
  };

  // task elete handler
  const handleDeleteTask = async (task) => {
    const { data } = await axiosSecure.delete(`/tasks/${task._id}`);
    if (data.deletedCount > 0) {
      toast.error("Task deleted successfully");
      refetch();
    }
  };

  // open modal
  const openEditModal = (task) => {
    setSelectedTask(task);
    setValue("edit_task", task.task);
    setValue("edit_work_duration", task.hours);
    setValue("edit_date", new Date(task.date));
    setIsModalOpen(true);
  };

  // modal form handler
  const handleEditSubmit = async (data) => {
    const updatedTask = {
      task: data.edit_task,
      hours: data.edit_work_duration,
      date: data.edit_date,
    };
    const { data: updated } = await axiosSecure.patch(
      `/tasks/${selectedTask._id}`,
      updatedTask
    );
    if (updated.modifiedCount > 0) {
      toast.success("Task updated successfully");
      refetch();
      setIsModalOpen(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Helmet>
        <title>Work Sheet | WorkForce Pro</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">Work Sheet</h2>

      {/*Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-wrap items-center gap-4 p-4 lg:flex-nowrap lg:gap-6 mb-6`}
      >
        {/* Task Select */}
        <select
          {...register("task", { required: true })}
          defaultValue={""}
          className="border p-2 rounded text-sm w-full max-w-md lg:w-auto"
          disabled={isModalOpen}
        >
          <option disabled value={""}>
            Select Your Task
          </option>
          <option>Sales</option>
          <option>Support</option>
          <option>Content</option>
          <option>Paper-work</option>
        </select>

        {/* Hours Worked Input */}
        <input
          type="number"
          {...register("work_duration", { required: true })}
          placeholder="Hours Worked"
          className="border p-2 rounded text-sm w-full max-w-md lg:w-auto"
          disabled={isModalOpen}
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
              className="border p-2 rounded text-sm w-full max-w-md lg:w-auto"
              disabled={isModalOpen}
            />
          )}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded w-full max-w-md lg:w-auto"
          disabled={isModalOpen}
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
          {sortedTasks.map((task) => (
            <tr
              key={task._id}
              className="odd:bg-background even:bg-accent/10 text-center"
            >
              <td className="p-2">{task.task}</td>
              <td className="p-2">{task.hours}</td>
              <td className="p-2">{new Date(task.date).toDateString()}</td>
              <td className="p-2">
                <button
                  className="text-primary hover:text-secondary"
                  onClick={() => openEditModal(task)}
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

      {/* modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Task"
        className="bg-white p-6 rounded shadow-lg max-w-md mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <form onSubmit={modalHandleSubmit(handleEditSubmit)}>
          <select
            {...modalRegister("edit_task", { required: true })}
            className="border p-2 rounded w-full mb-4"
          >
            <option>Sales</option>
            <option>Support</option>
            <option>Content</option>
            <option>Paper-work</option>
          </select>

          <input
            type="number"
            {...modalRegister("edit_work_duration", { required: true })}
            placeholder="Hours Worked"
            className="border p-2 rounded w-full mb-4"
          />

          <Controller
            name="edit_date"
            control={modalControl}
            defaultValue={new Date()}
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                className="border p-2 rounded w-full mb-4"
              />
            )}
          />

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
