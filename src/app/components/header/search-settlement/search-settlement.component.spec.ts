import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSettlementComponent } from './search-settlement.component';

describe('SearchSettlementComponent', () => {
  let component: SearchSettlementComponent;
  let fixture: ComponentFixture<SearchSettlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSettlementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
