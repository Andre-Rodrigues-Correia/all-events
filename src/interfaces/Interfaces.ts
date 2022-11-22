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


export { countryInterface, stateInterface, localInterface }