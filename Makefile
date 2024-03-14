.PHONY: dev
dev:
	npm run dev -- --open

src/lib/assets/cards_db.json:
	pants run tools/gen-cardsdb.py | jq . > $@

CARD_IMAGE_ROOT_URL = https://calebgannon.com/wp-content/uploads/cardsearch-images
CARD_IMAGE_URLS = $(shell for img in `jq -r '.cards[]|.image_name' src/lib/assets/cards_db.json`; do echo "$(CARD_IMAGE_ROOT_URL)/$$img"; done)

images: src/lib/assets/cards_db.json
	@> .urls
	@for url in $(CARD_IMAGE_URLS); do echo $$url >> .urls; done
	@wget -P static/card_images -i .urls
	@rm -f .urls

.PHONY: check-images
check-images: src/lib/assets/cards_db.json
	@for img in `jq -r '.cards[]|.image_name' $<`; do [ -e static/card_images/$$img ] || echo $$img; done
