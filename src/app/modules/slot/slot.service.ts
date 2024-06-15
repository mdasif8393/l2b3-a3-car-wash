import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Service } from '../service/service.model';
import { ISlot } from './slot.interface';
import { Slot } from './slot.model';

const createSlot = async (payload: ISlot) => {
  // if service not found show error
  const service = await Service.findById(payload.service);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  // check if slots are available or not
  const { startTime, endTime, date } = payload;

  const assignedSchedules = await Slot.find({ date }).select(
    'startTime endTime date',
  );

  const newSchedule = {
    startTime,
    endTime,
  };

  assignedSchedules.forEach((schedule) => {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);

    // if new slots are conflict with database slots show error
    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      throw new AppError(
        httpStatus.CONFLICT,
        `This slot is already created! try another time slot`,
      );
    }
  });

  // slot duration
  const { duration: intervalMinutes } = service;

  const hoursFromStartTime = Number(startTime.split(':')[0]) * 60;
  const minutesFromStartTime = Number(startTime.split(':')[1]);
  const startTimeToMinute = hoursFromStartTime + minutesFromStartTime;

  const hoursFromEndTime = Number(payload.endTime.split(':')[0]) * 60;
  const minutesFromEndTime = Number(payload.endTime.split(':')[1]);
  const endTimeToMinute = hoursFromEndTime + minutesFromEndTime;

  // calculate total minutes of service
  const totalMinutes = endTimeToMinute - startTimeToMinute;

  // create available slots function
  function createTimeSlots(
    startTime: string,
    intervalMinutes: number,
    totalMinutes: number,
  ) {
    const slots = [];
    const startTimeParts = startTime.split(':');
    let currentHour = parseInt(startTimeParts[0], 10);
    let currentMinute = parseInt(startTimeParts[1], 10);

    const totalSlots = totalMinutes / intervalMinutes;

    for (let i = 0; i < totalSlots; i++) {
      const startFormattedTime = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;

      currentMinute += intervalMinutes;
      if (currentMinute >= 60) {
        currentHour += Math.floor(currentMinute / 60);
        currentMinute = currentMinute % 60;
      }

      const endFormattedTime = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;

      slots.push([startFormattedTime, endFormattedTime]);
    }

    return slots;
  }

  const timeSlots = createTimeSlots(startTime, intervalMinutes, totalMinutes);

  const slots = [];

  for (let i = 0; i < timeSlots.length; i++) {
    const newSlot = {
      service: payload.service,
      date: payload.date,
      startTime: payload.startTime,
      endTime: payload.endTime,
    };

    newSlot.startTime = timeSlots[i][0];
    newSlot.endTime = timeSlots[i][1];
    slots.push(newSlot);
  }

  const result = await Slot.create(slots);

  return result;
};

const getAllSlots = async (query: Record<string, unknown>) => {
  const result = await Slot.find(query).populate('service');

  return result;
};

export const SlotServices = {
  createSlot,
  getAllSlots,
};
