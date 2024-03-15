.PHONY: dev
dev:
	npm run dev -- --open

src/lib/assets/cards_db.json: tools/gen-cardsdb.py
	pants run $< | jq . > $@

CARD_IMAGE_ROOT_URL = https://calebgannon.com/wp-content/uploads/cardsearch-images
CARD_IMAGE_URLS = $(shell for img in `jq -r '.cards[]|.image_name' src/lib/assets/cards_db.json`; do echo "$(CARD_IMAGE_ROOT_URL)/$$img"; done)

.urls: src/lib/assets/cards_db.json
	@> $@
	@for url in $(CARD_IMAGE_URLS); do echo $$url >> $@; done

images: .urls
	@wget -P static/card_images -i $<

.PHONY: check-images
check-images: src/lib/assets/cards_db.json
	@for img in `jq -r '.cards[]|.image_name' $<`; do [ -e static/card_images/$$img ] || echo $$img; done
