import { Body, Post, Controller, Delete, HttpCode, HttpStatus, Param, UseGuards, Request } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
// import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRdo } from './rdo/task.rdo';
import { TaskService } from './task.service';
import { RolesGuard } from './guards/user-role.guard';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  async create(@Body() dto: CreateTaskDto, @Request() req) {
    const userId = req.user.id;
    const newTask = await this.taskService.createTask({
      ...dto,
      userId
    });

    return fillObject(TaskRdo, newTask);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    const taskId = parseInt(id, 10);
    this.taskService.deleteTask(taskId);
  }

  // @Patch('/:id')
  // async update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
  //   const postId = parseInt(id, 10);
  //   const updatedPost = await this.taskService.updateTask(postId, dto);
  //   return fillObject(TaskRdo, updatedPost)
  // }
}
