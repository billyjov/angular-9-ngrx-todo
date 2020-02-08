import { Request, Response, Router } from 'express';
import { DeleteResult, getManager, UpdateResult } from 'typeorm';
import { Task } from '../entities/Task';

const router = Router();

router.get('/tasks', async (_req: Request, res: Response) => {
    try {
        const taskRepository = getManager().getRepository(Task);
        await taskRepository.find({
            order: { id: 'DESC' },
        }).then((tasks: Task[]) => {
            res.status(200).send(tasks);
        }).catch((error) => {
            res.status(400).send(error);
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/tasks', async (req: Request, res: Response) => {
    try {
        const taskRepository = getManager().getRepository(Task);
        const task: Task = new Task();
        const io = req.app.get('socketio');

        task.title = req.body.title;
        task.done = req.body.done;
        task.dueDate = req.body.dueDate;

        await taskRepository.save(task).then((result: Task) => {
            io.sockets.emit('taskCreated', task);

            return res.status(200).send({
                message: `Task successfully created`,
                response: result,
            });
        }).catch((error) => {
            res.status(400).send(error);
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put('/tasks/:id', (req: Request, res: Response) => {
    try {
        const taskRepository = getManager().getRepository(Task);
        const io = req.app.get('socketio');

        taskRepository.update(req.params.id, { ...req.body }).then((updatedTask: UpdateResult) => {
            io.sockets.emit('taskUpdated', updatedTask);
            res.status(200).send({
                message: `Task successfully updated`,
                response: updatedTask,
            });
        }).catch((error) => {
            res.status(400).send(error);
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/tasks/:id', async (req: Request, res: Response) => {
    try {
        const taskRepository = getManager().getRepository(Task);
        const taskEntity = await taskRepository.findOne(req.params.id);
        const io = req.app.get('socketio');

        if (taskEntity) {
            taskRepository.delete(req.params.id).then((result: DeleteResult) => {
                io.sockets.emit('taskDeleted', true);
                res.status(200).send({
                    message: `Task successfully deleted`,
                    response: result,
                });
            });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;
