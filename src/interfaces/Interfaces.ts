import { Schema, Document } from "mongoose"

interface countryInterface extends Document {
    name: string,
    coin: string
}

interface stateInterface extends Document {
    name: string,
    initials: string,
    country: Schema.Types.ObjectId
}

interface cityInterface extends Document {
  name: string,
  state: Schema.Types.ObjectId
}

interface categoryInterface extends Document {
  name: string,
}

interface typeInterface extends Document {
  name: string,
}

interface localInterface extends Document{
    name: string,
    description: string,
    value: string,
    type: Array<Schema.Types.ObjectId>
    address: {
      street: Schema.Types.ObjectId,
      district: Schema.Types.ObjectId,
      number: Schema.Types.ObjectId,
      city: Schema.Types.ObjectId,
      state: Schema.Types.ObjectId,
      country: Schema.Types.ObjectId,
    }
}

interface eventInterface extends Document{
  name: string,
  description: string,
  organizer: string,
  value: string,
  type: Array<Schema.Types.ObjectId>
  address: {
    street: Schema.Types.ObjectId,
    district: Schema.Types.ObjectId,
    number: Schema.Types.ObjectId,
    city: Schema.Types.ObjectId,
    state: Schema.Types.ObjectId,
    country: Schema.Types.ObjectId,
  },
  start_date: Schema.Types.Date,
  end_date: Schema.Types.Date
}


export { countryInterface, stateInterface, cityInterface, categoryInterface, typeInterface, localInterface, eventInterface }