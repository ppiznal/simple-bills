package pl.com.seremak.simplebills.commons.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class VersionedEntity {

    private Metadata metadata;
}
