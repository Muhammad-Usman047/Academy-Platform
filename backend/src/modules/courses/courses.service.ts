import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
  ) {}

  async create(dto: CreateCourseDto): Promise<Course> {
    const existing = await this.courseRepo.findOne({
      where: [{ slug: dto.slug }, { courseCode: dto.courseCode }],
    });
    if (existing) {
      throw new ConflictException('A course with this slug or course code already exists');
    }
    const course = this.courseRepo.create(dto);
    return this.courseRepo.save(course);
  }

  // public site: only active courses
  async findAllActive(): Promise<Course[]> {
    return this.courseRepo.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  // admin dashboard: everything
  async findAll(): Promise<Course[]> {
    return this.courseRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.courseRepo.findOne({ where: { id } });
    if (!course) throw new NotFoundException(`Course #${id} not found`);
    return course;
  }

  async findBySlug(slug: string): Promise<Course> {
    const course = await this.courseRepo.findOne({ where: { slug } });
    if (!course) throw new NotFoundException(`Course "${slug}" not found`);
    return course;
  }

  async update(id: number, dto: UpdateCourseDto): Promise<Course> {
    const course = await this.findOne(id);
    Object.assign(course, dto);
    return this.courseRepo.save(course);
  }

  async remove(id: number): Promise<{ message: string }> {
    const course = await this.findOne(id);
    await this.courseRepo.remove(course);
    return { message: `Course #${id} deleted` };
  }
}