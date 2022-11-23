package pl.com.seremak.simplebills.commons.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public abstract class Asset extends VersionedEntity {

    private String username;
    private String name;
    private BigDecimal value;
}
