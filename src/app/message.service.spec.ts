import { MessageService } from "./message.service"

describe('Message Service Test', ()=>{
    let service : MessageService;

    beforeEach(()=>{
        service = new MessageService();
    })

    it('should have no message when initialized', ()=>{
        expect(service.messages.length).toBe(0);
    })

    it('should have message when added', ()=>{
        service.add('message');

        expect(service.messages.length).toBe(1);
    })

    it('should have no message when cleared', ()=>{
        service.add('message');
        
        service.clear();

        expect(service.messages.length).toBe(0);
    })
})