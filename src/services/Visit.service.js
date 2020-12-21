import Visit from '../models/Visit';
import User from '../models/User';
import userService from './User.service';
class VisitService {

  static async create(params) {
    let { newEntity } = params;

    const visitor = await User.findOne({ where: { code: newEntity.visitor.code } });
    if (!visitor) {
      newEntity.visitor = await userService.create({ newEntity: newEntity.visitor });
    } else[
      newEntity.visitor.id = visitor.id
    ]

    const receiver = await User.findOne({ where: { code: newEntity.receiver.code } });
    if (!receiver) {
      newEntity.receiver = await userService.create({ newEntity: newEntity.receiver });
    } else[
      newEntity.receiver.id = receiver.id
    ]

    try {
      const visit = {
        reasonVisit: newEntity.reasonVisit,
        userVisitorId: newEntity.visitor.id,
        userReceiverId: newEntity.receiver.id
      }

      const entityCreated = await Visit.create(visit);
      return entityCreated;
    } catch (error) {
      throw error;
    }
  }

  static async getAll(params) {
    const { criterions } = params;

    try {
      const { rows } = await Visit.findAndCountAll({
        include: ['visitor', 'receiver'],
        ...criterions
         });
      const count = await Visit.count({ raw: true});   
      return { rows, page: criterions.page , count: rows.length, total: count };
    } catch (error) {
      console.log('VisitService -> getAll -> error', error)
      throw error;
    }
  }

}

export default VisitService;