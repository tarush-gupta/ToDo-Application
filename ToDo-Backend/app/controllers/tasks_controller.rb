class TasksController < ApplicationController
    protect_from_forgery with: :null_session

    def index
        @tasks = Task.all
        render json: {data: @tasks}
    end

    def show
        @task = Task.find(params[:id])
        render json: {data: @task}
    end

    def create
        @task = Task.new(task_params)

        if @task.save
            render json: {data: @task}
        else
            render json: {error: task.errors.messages}, status: 422
        end
    end

    def update
        @task = Task.find(params[:id])

        if @task.update(task_params)
            render json: {data: @task}
        else
            render json: {error: task.errors.messages}, status: 422
        end
    end

    def destroy
        @task = Task.find(params[:id])

        if @task.destroy
            render json: Task.all, status: :ok
        else
            render json: {error: task.errors.messages}, status: 422
        end
    end

    private
    def task_params # strong params, cannot be accessed outside controller
        params.require(:task).permit(:title, :body, :status)
    end

end