import { Subjects, Publisher, ExpirationCompleteEvent } from '@twtickets/common'

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete
}
