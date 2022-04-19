package com.ssafy.proma.service;

import java.util.Optional;

public abstract class AbstractService {

  public <T> T takeOp(Optional<T> op){
    return op.isPresent() ? op.get() : null;
  }
}
