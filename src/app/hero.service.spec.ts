import { TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

describe("Hero Service Integration Test", () => {
  let mockMsgService: MessageService;
  let testHttpTestingController;
  let service: HeroService;
  beforeEach(() => {
    mockMsgService = jasmine.createSpyObj(["add"]);
    TestBed.configureTestingModule({
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMsgService },
      ],
      imports: [HttpClientTestingModule],
    });
    testHttpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroService);
  });

  describe("Hero Service", () => {
    it("shoudl call correct URL", () => {
        //call getHero
      service.getHero(4).subscribe();

      // test the URL is being called
      const req = testHttpTestingController.expectOne('api/heroes/4');

      req.flush({id:4,name:'SuperDude', strength:100});
      expect(req.request.method).toBe('GET');

    });
  });
});
